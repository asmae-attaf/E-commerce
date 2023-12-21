package com.back.shopback.Entity;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@Table(name="panier")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Panier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "total", nullable = false)
    private Float total;
    @JsonIgnore
    @OneToMany(mappedBy = "panier",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Order> orders;
}
