package com.example.sociography.service;

import com.example.sociography.model.Follower;
import com.example.sociography.repository.FollowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FollowerService {

    @Autowired
    private FollowerRepository followerRepository;

    public List<Follower> findAll() {
        return followerRepository.findAll();
    }

    public Optional<Follower> findById(Integer id) {
        return followerRepository.findById(id);
    }

    public Follower save(Follower follower) {
        return followerRepository.save(follower);
    }

    public void deleteById(Integer id) {
        followerRepository.deleteById(id);
    }
}
