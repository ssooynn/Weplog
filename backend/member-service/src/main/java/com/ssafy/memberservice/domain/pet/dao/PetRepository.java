package com.ssafy.memberservice.domain.pet.dao;

import com.ssafy.memberservice.domain.pet.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query("select p from Pet p where p.level=:level")
    List<Pet> getPetsByLevel(int level);
}
