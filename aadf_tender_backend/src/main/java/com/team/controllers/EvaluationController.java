package com.team.controllers;

import com.team.models.Evaluation;
import com.team.models.Offer;
import com.team.services.EvaluationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teamFinder/api/evaluations")
@CrossOrigin(origins = "http://localhost:4200")
public class EvaluationController {
    private final EvaluationService service;

    public EvaluationController(EvaluationService service) {
        this.service = service;
    }

    @PostMapping
    public Evaluation score(@RequestBody Evaluation eval) {
        return service.score(eval);
    }

    @GetMapping("/{id}")
    public Optional<Evaluation> get(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/offer/{offerId}")
    public List<Evaluation> listByOffer(@PathVariable Long offerId) {
        Offer o = new Offer();
        return service.findByOffer(o);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/evaluator/{evaluatorId}")
    public List<Evaluation> listByEvaluator(@PathVariable Long evaluatorId) {
        return service.findByEvaluator(evaluatorId);
    }
}
