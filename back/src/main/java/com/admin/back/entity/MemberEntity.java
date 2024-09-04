package com.admin.back.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.stream.Collectors;

@Entity
@Table(name="members")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "id")
    private String id;
    
    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "address")
    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "type")
    private String type;

    @Column(name = "role")
    private String role;

    @Column(name = "create_at")
    private LocalDateTime createAt;
    
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<MemberCouponEntity> memberCoupons = new HashSet<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private MemberPointsEntity memberPoints;

    public void updateMemberCoupons(Set<MemberCouponEntity> newMemberCoupons) {
        this.memberCoupons.clear();
        newMemberCoupons.forEach(this::addCoupon);
    }

    public void addCoupon(MemberCouponEntity memberCoupon) {
        this.memberCoupons.add(memberCoupon);
        memberCoupon.setMember(this);
    }

    public void removeCoupon(MemberCouponEntity memberCoupon) {
        this.memberCoupons.remove(memberCoupon);
        memberCoupon.setMember(null);
    }

    @Override
    public String toString() {
        return "MemberEntity{" +
                "memberId=" + memberId +
                ", id='" + id + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", address='" + address + '\'' +
                ", detailAddress='" + detailAddress + '\'' +
                ", type='" + type + '\'' +
                ", role='" + role + '\'' +
                ", memberCoupons=" + memberCoupons.stream()
                        .map(MemberCouponEntity::toString)
                        .collect(Collectors.joining(", ")) +
                ", memberPoints=" + (memberPoints != null ? memberPoints.toString() : "null") +
                '}';
    }
}