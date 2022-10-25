package com.ssafy.weplog.domain.mysql.pet.dao;

import com.ssafy.weplog.domain.mysql.pet.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
