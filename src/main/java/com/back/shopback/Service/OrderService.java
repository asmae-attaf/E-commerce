package com.back.shopback.Service;



import com.back.shopback.Entity.Order;
import com.back.shopback.Repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository OrderRepository;

    public OrderService(OrderRepository OrderRepository) {
        this.OrderRepository = OrderRepository;
    }

    public void addOrder(Order Order){
        OrderRepository.save(Order);
    }
    public void updateCommaande(Order Order){
        OrderRepository.save(Order);
    }
    public void deleteOrder(Integer id){
        OrderRepository.deleteById(id);
    }
    public List<Order> getAllOrders(){
        return OrderRepository.findAll();
    }
    public Optional<Order> getOrdersById(Integer id){
        return OrderRepository.findById(id);
    }
}
