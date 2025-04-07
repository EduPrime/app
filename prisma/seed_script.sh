#!/bin/bash

SEEDS = (
    "roles"
    "users"
    "institution"
    "school"
    "course"
    "series"
    "classroom"
    "server_manager"
    "students"
    "teacher"
    "stage"
    "disciplines"
    "preenrollment"
    "enrollment"
    "evaluation_rules"
    "content"
    "bncc4th"
    "bncc6th"
    "bncc7th"
    "grades"
    "justification"
    "attendance"
    "concept"
    "schedule"
    "teacher_attendance"
    )

for seed in "${SEEDS[@]}"
do
  echo "Seeding $seed..."
  bun "prisma/seeds/seed_${seed}.ts"
done