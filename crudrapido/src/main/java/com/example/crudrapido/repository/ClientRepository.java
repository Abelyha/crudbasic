package com.example.crudrapido.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.crudrapido.entity.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}
