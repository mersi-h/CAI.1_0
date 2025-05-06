package com.team.controllers;

import com.team.models.User;
import com.team.services.AuditLogService;
import com.team.services.ReportingService;
import com.team.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/teamFinder/api/reports")
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {
    private final ReportingService reportingService;
    private final AuditLogService auditLogService;
    private final UserService userService;

    public ReportController(ReportingService reportingService,
                            AuditLogService auditLogService,
                            UserService userService) {
        this.reportingService = reportingService;
        this.auditLogService = auditLogService;
        this.userService = userService;
    }

    @GetMapping("/{tenderId}")
    public ResponseEntity<byte[]> downloadReport(@PathVariable Long tenderId,
                                                 Principal principal) {
        // Generate the PDF report
        byte[] pdf = reportingService.generatePdfReport(tenderId);

        // Record audit with current user
        String username = principal.getName();
        User actor = userService.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found: " + username));
        auditLogService.recordData(actor.getUsername(), "GENERATE_REPORT", "Generated report for Tender " + tenderId);

        // Return PDF as attachment
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"tender-" + tenderId + "-report.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
