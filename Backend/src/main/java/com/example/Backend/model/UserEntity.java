package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String name;
    private String surname;

    @Column(name = "net_worth")
    private BigDecimal netWorth;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private BankAccount bankAccount;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Expense> expenses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Asset> assets;


    public UserEntity(String email, String password, String name, String surname, BigDecimal netWorth) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.netWorth = netWorth;
    }


    public <E> UserEntity(Object o, String mail, String hashedpassword, String user, String surname, double v, ArrayList<E> es, Object o1, ArrayList<E> es1, ArrayList<E> es2, Object o2) {
    }
}
