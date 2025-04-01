package com.crmsystem.auth.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "roles")
@Data
// @NoArgsConstructor -- not working properly
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;
    
    // Explicit no-arg constructor required by JPA
    public Role() {
    }

    public Role(ERole name) {
        this.name = name;
    }
    
    // Explicit getter to resolve the compilation error
    public ERole getName() {
        return name;
    }
    
    // Add explicit setter
    public void setName(ERole name) {
        this.name = name;
    }
} 