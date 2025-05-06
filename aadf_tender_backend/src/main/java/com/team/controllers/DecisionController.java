package com.team.controllers;

import com.team.models.Decision;
import com.team.models.Tender;
import com.team.services.DecisionService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/teamFinder/api/decisions")
@CrossOrigin(origins = "http://localhost:4200")
public class DecisionController {
    private final DecisionService service;

    public DecisionController(DecisionService service) {
        this.service = service;
    }

    @PostMapping
    public Decision decide(@RequestBody Decision decision) {
        return service.decide(decision);
    }

    @GetMapping("/tender/{tenderId}")
    public Optional<Decision> getByTender(@PathVariable Long tenderId) {
        Tender t = new Tender();
        return service.findByTender(t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
