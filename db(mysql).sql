CREATE TABLE usercocovoiturage (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE, 
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rideoffer (
    offer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_datetime TIMESTAMP NOT NULL,
    available_seats INT NOT NULL,
    car_details TEXT,
    preferences TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usercocovoiturage(user_id)
);

CREATE TABLE riderequest (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    ride_id INT NOT NULL,
    user_id INT NOT NULL,
    request_status VARCHAR(20) NOT NULL, -- 'pending', 'accepted', 'rejected'
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rideoffer(offer_id),
    FOREIGN KEY (user_id) REFERENCES usercocovoiturage(user_id)
);

CREATE TABLE booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    ride_id INT NOT NULL,
    passenger_id INT NOT NULL,
    booking_status VARCHAR(20) NOT NULL, -- 'confirmed', 'canceled'
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rideoffer(offer_id),
    FOREIGN KEY (passenger_id) REFERENCES usercocovoiturage(user_id)
);

CREATE TABLE ridefeedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    ride_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL, -- Assuming rating is an integer between 1 to 5
    comment TEXT,
    feedback_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rideoffer(offer_id),
    FOREIGN KEY (user_id) REFERENCES usercocovoiturage(user_id)
);
