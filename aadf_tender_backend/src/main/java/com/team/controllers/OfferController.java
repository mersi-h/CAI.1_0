package com.team.controllers;

import com.team.models.Offer;
import com.team.models.Tender;
import com.team.models.User;
import com.team.services.OfferService;
import com.team.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teamFinder/api/offers")
@CrossOrigin(origins = "http://localhost:4200")
public class OfferController {
    private final OfferService offerService;
    private final UserService userService;

    public OfferController(OfferService offerService,
                           UserService userService) {
        this.offerService = offerService;
        this.userService = userService;
    }

    @PostMapping
    public Offer submit(@RequestBody Offer offer) {
        return offerService.submit(offer);
    }

    @GetMapping
    public List<Offer> list() {
        return offerService.findByTender(null);
    }

    @GetMapping("/{id}")
    public Optional<Offer> get(@PathVariable Long id) {
        return offerService.findById(id);
    }

    @GetMapping("/tender/{tenderId}")
    public List<Offer> listByTender(@PathVariable Long tenderId) {
        Tender t = new Tender();
        return offerService.findByTender(t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        offerService.delete(id);
    }

    @PostMapping("/offers/upload")
    public ResponseEntity<Offer> uploadOffer(
            @RequestParam("tenderId") Long tenderId,
            @RequestParam("file") MultipartFile file,
            Principal principal
    ) throws Exception {
        User vendor = this.userService.findByUsername(principal.getName()).get();
        Offer o = offerService.submit(file, tenderId, vendor);
        return ResponseEntity.ok(o);
    }
}
