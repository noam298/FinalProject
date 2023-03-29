INSERT INTO students (email, groupno)
VALUES
    ('noam@gmail.com', 1),
    ('nir@gmail.com', 2),
    ('shiran@gmail.com', 3),
    ('yarden@gmail.com', 4),
    ('shahar@gmail.com', 5),
    ('anita@gmail.com', 6);

ALTER TABLE students ALTER COLUMN webattendee DROP NOT NULL;

ALTER TABLE students 
ALTER COLUMN q1 SET DATA TYPE varchar(10),
ALTER COLUMN q2 SET DATA TYPE varchar(10),
ALTER COLUMN q3 SET DATA TYPE varchar(10),
...
ALTER COLUMN q42 SET DATA TYPE varchar(10);

ALTER TABLE students 
ALTER COLUMN q25 SET DATA TYPE varchar(10),
ALTER COLUMN q26 SET DATA TYPE varchar(10),
ALTER COLUMN q27 SET DATA TYPE varchar(10),
ALTER COLUMN q28 SET DATA TYPE varchar(10),
ALTER COLUMN q29 SET DATA TYPE varchar(10),
ALTER COLUMN q30 SET DATA TYPE varchar(10),
ALTER COLUMN q31 SET DATA TYPE varchar(10),
ALTER COLUMN q32 SET DATA TYPE varchar(10),
ALTER COLUMN q33 SET DATA TYPE varchar(10),
ALTER COLUMN q34 SET DATA TYPE varchar(10),
ALTER COLUMN q35 SET DATA TYPE varchar(10),
ALTER COLUMN q36 SET DATA TYPE varchar(10),
ALTER COLUMN q37 SET DATA TYPE varchar(10),
ALTER COLUMN q38 SET DATA TYPE varchar(10),
ALTER COLUMN q39 SET DATA TYPE varchar(10),
ALTER COLUMN q40 SET DATA TYPE varchar(10),
ALTER COLUMN q41 SET DATA TYPE varchar(10),
ALTER COLUMN q42 SET DATA TYPE varchar(10);

