package com.team.controllers;

import com.team.models.Tender;
import com.team.models.TenderCriterion;
import com.team.services.TenderCriterionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("//teamFinder/api/tender-criteria")
@CrossOrigin(origins = "http://localhost:4200")
public class TenderCriterionController {
    private final TenderCriterionService service;

    public TenderCriterionController(TenderCriterionService service) {
        this.service = service;
    }

    @PostMapping
    public TenderCriterion assign(@RequestBody TenderCriterion tc) {
        return service.assign(tc);
    }

    @GetMapping("/tender/{tenderId}")
    public List<TenderCriterion> listByTender(@PathVariable Long tenderId) {
        Tender t = new Tender();
        return service.findByTender(t);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id) {
        service.remove(id);
    }
}
