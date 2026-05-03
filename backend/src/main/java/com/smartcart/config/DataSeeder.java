package com.smartcart.config;

import com.smartcart.entity.Product;
import com.smartcart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() < 50) {
            System.out.println("Seeding database with 50 products to demonstrate pagination...");

            List<Product> products = new ArrayList<>(List.of(
                    Product.builder()
                            .name("MacBook Pro 16\"")
                            .description("Apple M3 Max chip with 14-core CPU, 30-core GPU, 36GB Unified Memory, 1TB SSD Storage.")
                            .price(new BigDecimal("3499.00"))
                            .stockQuantity(15)
                            .category("Laptops")
                            .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("iPhone 15 Pro Max")
                            .description("Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.")
                            .price(new BigDecimal("1199.00"))
                            .stockQuantity(30)
                            .category("Smartphones")
                            .imageUrl("https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("Sony WH-1000XM5")
                            .description("Industry Leading Noise Canceling Wireless Headphones with Auto Noise Canceling Optimizer, and Crystal Clear Hands-Free Calling.")
                            .price(new BigDecimal("398.00"))
                            .stockQuantity(45)
                            .category("Audio")
                            .imageUrl("https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("Dell UltraSharp 32\" 4K Monitor")
                            .description("Experience stunning visual quality with this 31.5-inch 4K monitor featuring IPS Black technology for brilliant color and contrast.")
                            .price(new BigDecimal("849.99"))
                            .stockQuantity(12)
                            .category("Monitors")
                            .imageUrl("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("Logitech MX Master 3S")
                            .description("Advanced Wireless Mouse with 8K DPI track-on-glass sensor, Quiet Clicks, and MagSpeed scrolling.")
                            .price(new BigDecimal("99.99"))
                            .stockQuantity(100)
                            .category("Accessories")
                            .imageUrl("https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("Keychron Q1 Pro")
                            .description("A full metal QMK/VIA wireless custom mechanical keyboard. Features a 75% layout, double-gasket design, and CNC aluminum body.")
                            .price(new BigDecimal("199.00"))
                            .stockQuantity(25)
                            .category("Accessories")
                            .imageUrl("https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("Samsung Galaxy S24 Ultra")
                            .description("Unleash new ways to create, connect and more with Galaxy AI. Features a 200MP camera and Snapdragon 8 Gen 3 processor.")
                            .price(new BigDecimal("1299.99"))
                            .stockQuantity(40)
                            .category("Smartphones")
                            .imageUrl("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("Nintendo Switch OLED")
                            .description("Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen with the Nintendo Switch (OLED model) system.")
                            .price(new BigDecimal("349.99"))
                            .stockQuantity(60)
                            .category("Gaming")
                            .imageUrl("https://images.unsplash.com/photo-1612036781124-847f8939b154?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("Apple Watch Series 9")
                            .description("Smarter. Brighter. Mightier. Features the S9 chip, a super bright display, and a magical new way to interact without touching the screen.")
                            .price(new BigDecimal("399.00"))
                            .stockQuantity(50)
                            .category("Wearables")
                            .imageUrl("https://images.unsplash.com/photo-1434493789847-2f02b0d2823d?auto=format&fit=crop&w=800&q=80")
                            .build(),
                    Product.builder()
                            .name("LG C3 Series 65\" OLED TV")
                            .description("The LG OLED evo C3 is powered by the a9 AI Processor Gen6—made exclusively for LG OLED—for beautiful picture and performance.")
                            .price(new BigDecimal("1596.99"))
                            .stockQuantity(8)
                            .category("Televisions")
                            .imageUrl("https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80")
                            .build()
            ));

            String[] categories = {"Accessories", "Smartphones", "Audio", "Laptops", "Home Office"};

            for (int i = 1; i <= 40; i++) {
                String cat = categories[i % categories.length];
                products.add(Product.builder()
                        .name("Premium " + cat + " Product " + i)
                        .description("High quality " + cat.toLowerCase() + " product number " + i + " with excellent features and durability. A great addition to your setup.")
                        .price(new BigDecimal(19.99 + (i * 24.50)).setScale(2, RoundingMode.HALF_UP))
                        .stockQuantity(100 - i)
                        .category(cat)
                        .imageUrl("https://picsum.photos/seed/smartcart" + i + "/800/800")
                        .build());
            }

            productRepository.saveAll(products);
            System.out.println("Seeded 50 products successfully!");
        }
    }
}
