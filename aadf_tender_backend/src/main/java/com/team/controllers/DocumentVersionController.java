package com.team.controllers;

import com.team.models.DocumentVersion;
import com.team.models.Offer;
import com.team.models.Tender;
import com.team.services.DocumentVersionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teamFinder/api/documents")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentVersionController {
    private final DocumentVersionService service;

    public DocumentVersionController(DocumentVersionService service) {
        this.service = service;
    }

    @PostMapping
    public DocumentVersion upload(@RequestBody DocumentVersion dv) {
        return service.upload(dv);
    }

    @GetMapping("/{id}")
    public Optional<DocumentVersion> get(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/tender/{tenderId}")
    public List<DocumentVersion> listByTender(@PathVariable Long tenderId) {
        Tender t = new Tender();
        return service.findByTender(t);
    }

    @GetMapping("/offer/{offerId}")
    public List<DocumentVersion> listByOffer(@PathVariable Long offerId) {
        Offer o = new Offer();
        return service.findByOffer(o);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
