create table dic_attendance_work_types
(
    id            bigint       not null,
    name         varchar(255) not null,
    CONSTRAINT dic_attendance_work_types_pk PRIMARY KEY (id)
);

GRANT all on dic_attendance_work_types to postgres;

insert into dic_attendance_work_types(id, name)
values
    (1, 'Wdrożenie pracownika'),
    (2, 'Rozwój osobisty'),
    (3, 'Utrzymanie'),
    (4, 'Inne');
