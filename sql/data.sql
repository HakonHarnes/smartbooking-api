-- --------- --
-- TEST DATA --
-- --------- --

-- ORGANIZATIONS
INSERT INTO organization (
  organization_name, organization_number, 
  organization_address, postal_code, 
  postal_zone, contact_name
) 
VALUES (
    "Kallemannen AS", "7853234", "Stavnevegen 61", 
    "4523", "Arendal", "Espen Kalleberg"
  );

-- USERS 
INSERT INTO user (
  role, email, first_name, last_name, 
  hashed_password
) 
VALUES (
    "admin", "admin@smartbooking.no", 
    "Admin", "Lastname", "$2b$10$kdq9hXGfiTHY.p.StHp6s.UYegCgQbBwRtkAtYQXuH009WcmZxMj2"
  );

INSERT INTO user (
  role, email, first_name, last_name, 
  hashed_password, organization_id
) 
VALUES (
    "customer", "customer@smartbooking.no", 
    "Customer", "Lastname", "$2b$10$kdq9hXGfiTHY.p.StHp6s.UYegCgQbBwRtkAtYQXuH009WcmZxMj2", 
    1
  );

INSERT INTO user (
  email, first_name, last_name, hashed_password, 
  organization_id
) 
VALUES (
    "user@smartbooking.no", "User", "Lastname", 
    "$2b$10$kdq9hXGfiTHY.p.StHp6s.UYegCgQbBwRtkAtYQXuH009WcmZxMj2", 
    1
  );

-- BUILDINGS 
INSERT INTO building (building_name, organization_id) 
VALUES ("Storebygg", 1);

INSERT INTO building (building_name, organization_id) 
VALUES ("Lillebygg", 1);

-- BOOKING POLICIES 
INSERT INTO booking_policy (
  max_time_per_reservation, max_days_lookup, 
  length_period, reservations_per_period, 
  organization_id
) 
VALUES (6, 14, 30, 4, 1);

-- ROOMS
INSERT INTO room (
  room_name, size, is_active, organization_id, 
  building_id
) 
VALUES ("SB1", 4, 1, 1, 1);

INSERT INTO room (
  room_name, size, is_active, organization_id, 
  building_id
) 
VALUES ("SB2", 8, 1, 1, 1);

INSERT INTO room (
  room_name, size, is_active, organization_id, 
  building_id
) 
VALUES ("SB3", 2, 1, 1, 1);

INSERT INTO room (
  room_name, size, is_active, organization_id, 
  building_id
) 
VALUES ("SB4", 4, 0, 1, 1);

INSERT INTO room (
  room_name, size, is_active, organization_id, 
  building_id
) 
VALUES ("LB1", 2, 1, 1, 2);

INSERT INTO room (
  room_name, size, is_active, organization_id, 
  building_id
) 
VALUES ("LB2", 4, 0, 1, 2);

-- BOOKING POLICY TIMES 
INSERT INTO booking_policy_times (
  start_mon, end_mon, start_tue, end_tue, 
  start_wed, end_wed, start_thu, end_thu, 
  start_fri, end_fri, start_sat, end_sat, 
  start_sun, end_sun, building_id
) 
VALUES (
    "07:00", "19:00", "07:00", "19:00", 
    "07:00", "19:00", "07:00", "19:00", 
    "07:00", "19:00", "07:00", "19:00", 
    "07:00", "19:00", 1
  );

INSERT INTO booking_policy_times (
  start_mon, end_mon, start_tue, end_tue, 
  start_wed, end_wed, start_thu, end_thu, 
  start_fri, end_fri, start_sat, end_sat, 
  start_sun, end_sun, building_id
) 
VALUES (
    "07:00", "19:00", "07:00", "19:00", 
    "07:00", "19:00", "07:00", "19:00", 
    "07:00", "19:00", "07:00", "19:00", 
    "07:00", "19:00", 2
  );

-- RESERVATIONS 
INSERT INTO reservation (start, end, room_id, user_id) 
VALUES (
    "2021-10-03 08:00:00", "2021-10-03 10:00:00", 
    1, 3
  );

INSERT INTO reservation (start, end, room_id, user_id) 
VALUES (
    "2021-10-03 09:00:00", "2021-10-03 10:00:00", 
    1, 2
  );

INSERT INTO reservation (start, end, room_id, user_id) 
VALUES (
    "2021-10-05 10:00:00", "2021-10-05 12:00:00", 
    2, 2
  );

INSERT INTO reservation (start, end, room_id, user_id) 
VALUES (
    "2021-10-05 14:00:00", "2021-10-05 15:00:00", 
    2, 3
  );

INSERT INTO reservation (start, end, room_id, user_id) 
VALUES (
    "2021-10-08 11:00:00", "2021-10-08 16:30:00", 
    2, 3
  );