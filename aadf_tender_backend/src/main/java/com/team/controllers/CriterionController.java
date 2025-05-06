package com.team.controllers;

import com.team.models.Criterion;
import com.team.services.CriterionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teamFinder/api/criteria")
@CrossOrigin(origins = "http://localhost:4200")
public class CriterionController {
    private final CriterionService criterionService;

    public CriterionController(CriterionService criterionService) {
        this.criterionService = criterionService;
    }

    @PostMapping
    public Criterion create(@RequestBody Criterion c) {
        return criterionService.create(c);
    }

    @GetMapping
    public List<Criterion> list() {
        return criterionService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Criterion> get(@PathVariable Long id) {
        return criterionService.findById(id);
    }

    @PutMapping("/{id}")
    public Criterion update(@PathVariable Long id, @RequestBody Criterion c) {
        return criterionService.update(c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        criterionService.delete(id);
    }
}
