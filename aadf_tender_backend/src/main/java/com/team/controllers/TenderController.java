package com.team.controllers;

import com.team.models.Tender;
import com.team.services.TenderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teamFinder/api/tenders")
@CrossOrigin(origins = "http://localhost:4200")
public class TenderController {
    private final TenderService tenderService;

    public TenderController(TenderService tenderService) {
        this.tenderService = tenderService;
    }

    @PreAuthorize("hasRole('PROCUREMENT_OFFICER')")
    @PostMapping
    public Tender create(@RequestBody Tender tender) {
        return tenderService.create(tender);
    }

    @PreAuthorize("hasRole('PROCUREMENT_OFFICER')")
    @GetMapping
    public List<Tender> listActive() {
        return tenderService.findActive();
    }

    @PreAuthorize("hasRole('PROCUREMENT_OFFICER')")
    @GetMapping("/{id}")
    public Optional<Tender> get(@PathVariable Long id) {
        return tenderService.findById(id);
    }

    @PreAuthorize("hasAuthority('PROCUREMENT_OFFICER')")
    @PutMapping("/{id}")
    public Tender update(@PathVariable Long id, @RequestBody Tender tender) {
        return tenderService.update(tender);
    }

    @PreAuthorize("hasAuthority('PROCUREMENT_OFFICER')")
    @PostMapping("/{id}/publish")
    public Tender publish(@PathVariable Long id) {
        return tenderService.publish(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tenderService.delete(id);
    }
}
