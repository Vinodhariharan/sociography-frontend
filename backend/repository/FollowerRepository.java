package com.example.sociography.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.sociography.model.Follower;

public interface FollowerRepository extends JpaRepository<Follower, Integer> {

    @Query("SELECT COUNT(f) FROM Follower f WHERE f.following.id = :photographerId AND f.followerType = 'photographer'")
    int countFollowersByPhotographerId(@Param("photographerId") int photographerId);

    @Query("SELECT COUNT(f) FROM Follower f WHERE f.following.id = :photographerId AND f.followerType = 'photographer'")
    int countFollowingByPhotographerId(@Param("photographerId") int photographerId);
}
