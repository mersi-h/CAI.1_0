package com.team.services.service_impl;

import com.team.models.Decision;
import com.team.models.Evaluation;
import com.team.models.Offer;
import com.team.models.Tender;
import com.team.repository.DecisionRepository;
import com.team.repository.EvaluationRepository;
import com.team.repository.OfferRepository;
import com.team.repository.TenderRepository;
import com.team.services.AuditLogService;
import com.team.services.ReportingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
public class ReportingServiceImpl implements ReportingService {
    private final TenderRepository tenderRepo;
    private final OfferRepository offerRepo;
    private final EvaluationRepository evalRepo;
    private final DecisionRepository decisionRepo;
    private final AuditLogService audit;

    public ReportingServiceImpl(
            TenderRepository tenderRepo,
            OfferRepository offerRepo,
            EvaluationRepository evalRepo,
            DecisionRepository decisionRepo,
            AuditLogService audit
    ) {
        this.tenderRepo = tenderRepo;
        this.offerRepo = offerRepo;
        this.evalRepo = evalRepo;
        this.decisionRepo = decisionRepo;
        this.audit = audit;
    }

    @Override
    public byte[] generatePdfReport(Long tenderId) {
        Tender tender = tenderRepo.findById(tenderId)
                .orElseThrow(() -> new IllegalArgumentException("Tender not found: " + tenderId));

        List<Offer> offers = offerRepo.findAllByTender_Id(tender.getId());
        Optional<Decision> decisionOpt = decisionRepo.findByTender_Id(tender.getId());

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document doc = new Document(PageSize.A4);
            PdfWriter.getInstance(doc, baos);
            doc.open();

            // Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            doc.add(new Paragraph("Procurement Report", titleFont));
            doc.add(Chunk.NEWLINE);

            // Tender Info
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            doc.add(new Paragraph("Tender: " + tender.getSubject(), headerFont));
            doc.add(new Paragraph("Description: " + tender.getDescription()));
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            doc.add(new Paragraph("Deadline: " + tender.getDeadline().format(fmt)));
            doc.add(Chunk.NEWLINE);

            // Table of Offers and Scores
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2, 3, 2, 4, 2});
            Stream.of("Offer ID", "Vendor", "Avg Score", "Comments", "Decision")
                    .forEach(h -> {
                        PdfPCell cell = new PdfPCell(new Phrase(h, headerFont));
                        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                        table.addCell(cell);
                    });

            for (Offer o : offers) {
                List<Evaluation> evals = evalRepo.findAllByOffer_Id(o.getId());
                double avg = evals.stream()
                        .mapToInt(Evaluation::getTotalScore)
                        .average().orElse(0.0);
                String comments = evals.stream()
                        .map(Evaluation::getComments)
                        .filter(c -> c != null && !c.isEmpty())
                        .collect(Collectors.joining("; "));
                String decisionMark = decisionOpt
                        .filter(d -> d.getWinningOffer().getId().equals(o.getId()))
                        .map(d -> "Winner")
                        .orElse("");

                table.addCell(o.getId().toString());
                table.addCell(o.getVendor().getUsername());
                table.addCell(String.format("%.1f", avg));
                table.addCell(comments);
                table.addCell(decisionMark);
            }
            doc.add(table);
            doc.add(Chunk.NEWLINE);

            // Decision rationale
            if (decisionOpt.isPresent()) {
                Decision decision = decisionOpt.get();
                doc.add(new Paragraph("Final Decision", headerFont));
                doc.add(new Paragraph("Winning Offer ID: " + decision.getWinningOffer().getId()));
                doc.add(new Paragraph("Decided By: " + decision.getDecidedBy().getUsername()));
                doc.add(new Paragraph("Comment: " + decision.getComment()));
            }

            doc.close();
            audit.recordData(LoggedUser.getUsername(), "GENERATE_REPORT", "Generated report for Tender " + tenderId);
            return baos.toByteArray();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to generate report for tender " + tenderId, ex);
        }
    }
}
