package com.back.shopback.Controlleur;



import com.back.shopback.Entity.Order;
import com.back.shopback.Entity.Panier;
import com.back.shopback.Service.OrderService;
import com.back.shopback.Service.PanierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class OrderControlleur {
    @Autowired
    OrderService OrderService;
    @PostMapping("/api/Order/add")
    public void addOrder(@RequestBody Order Order) {
        OrderService.addOrder(Order);
    }
    @PutMapping("/api/Order/update/{id}")
    public void updateOrder(@RequestBody Order Order) {
        OrderService.updateCommaande(Order);
    }
    @DeleteMapping("/api/Order/delete/{id}")
    public void deleteOrder(@PathVariable Integer id) {
        OrderService.deleteOrder(id);
    }


    @GetMapping("/api/Order/AllOrders")

    public List<Order> getAllOrder() {
        return OrderService.getAllOrders();
    }
    @GetMapping("/api/Order/{id}")
    public Optional<Order> getOrderById(@PathVariable Integer id) {
        return OrderService.getOrdersById(id);
    }
}