package com.example.sociography.controller;

import com.example.sociography.model.Follower;
import com.example.sociography.service.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/followers")
public class FollowerController {

    @Autowired
    private FollowerService followerService;

    @GetMapping
    public List<Follower> getAllFollowers() {
        return followerService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Follower> getFollowerById(@PathVariable Integer id) {
        Optional<Follower> follower = followerService.findById(id);
        return follower.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Follower createFollower(@RequestBody Follower follower) {
        return followerService.save(follower);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Follower> updateFollower(@PathVariable Integer id, @RequestBody Follower updatedFollower) {
        return followerService.findById(id)
            .map(existingFollower -> {
                updatedFollower.setConnectionId(existingFollower.getConnectionId());
                return ResponseEntity.ok(followerService.save(updatedFollower));
            }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFollower(@PathVariable Integer id) {
        return followerService.findById(id)
            .map(existingFollower -> {
                followerService.deleteById(id);
                return ResponseEntity.noContent().build();
            }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

