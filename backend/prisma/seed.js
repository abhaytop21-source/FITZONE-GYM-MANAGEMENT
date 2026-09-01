import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exercises = [
    // =========================
    // CHEST
    // =========================
    {
        name: "Push Up",
        description: "A bodyweight exercise targeting the chest, shoulders and triceps.",
        muscleGroup: "Chest",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        instructions: "Keep your body straight, lower your chest toward the floor, then push back up.",
    },
    {
        name: "Bench Press",
        description: "A compound chest exercise performed using a barbell.",
        muscleGroup: "Chest",
        equipment: "Barbell",
        difficulty: "Intermediate",
        instructions: "Lower the bar to your chest with control and press it upward.",
    },
    {
        name: "Incline Dumbbell Press",
        description: "Targets the upper chest using dumbbells.",
        muscleGroup: "Chest",
        equipment: "Dumbbells",
        difficulty: "Intermediate",
        instructions: "Press the dumbbells upward from an incline bench and lower them under control.",
    },
    {
        name: "Cable Fly",
        description: "An isolation exercise for the chest.",
        muscleGroup: "Chest",
        equipment: "Cable Machine",
        difficulty: "Intermediate",
        instructions: "Bring the handles together in front of your chest while maintaining a slight bend in your elbows.",
    },

    // =========================
    // BACK
    // =========================
    {
        name: "Lat Pulldown",
        description: "A pulling exercise targeting the latissimus dorsi.",
        muscleGroup: "Back",
        equipment: "Cable Machine",
        difficulty: "Beginner",
        instructions: "Pull the bar toward your upper chest while keeping your torso stable.",
    },
    {
        name: "Seated Cable Row",
        description: "A horizontal pulling exercise for the back.",
        muscleGroup: "Back",
        equipment: "Cable Machine",
        difficulty: "Beginner",
        instructions: "Pull the handle toward your abdomen while keeping your back controlled.",
    },
    {
        name: "Barbell Row",
        description: "A compound exercise targeting the upper and middle back.",
        muscleGroup: "Back",
        equipment: "Barbell",
        difficulty: "Intermediate",
        instructions: "Hinge forward, keep your back neutral and pull the bar toward your torso.",
    },
    {
        name: "Pull Up",
        description: "A bodyweight pulling exercise targeting the back and arms.",
        muscleGroup: "Back",
        equipment: "Pull-up Bar",
        difficulty: "Advanced",
        instructions: "Pull your body upward until your chin clears the bar, then lower with control.",
    },

    // =========================
    // SHOULDERS
    // =========================
    {
        name: "Dumbbell Shoulder Press",
        description: "A pressing movement targeting the shoulders.",
        muscleGroup: "Shoulders",
        equipment: "Dumbbells",
        difficulty: "Beginner",
        instructions: "Press the dumbbells overhead while keeping your core stable.",
    },
    {
        name: "Lateral Raise",
        description: "An isolation exercise targeting the side deltoids.",
        muscleGroup: "Shoulders",
        equipment: "Dumbbells",
        difficulty: "Beginner",
        instructions: "Raise the dumbbells sideways until approximately shoulder height.",
    },
    {
        name: "Front Raise",
        description: "An isolation exercise targeting the front deltoids.",
        muscleGroup: "Shoulders",
        equipment: "Dumbbells",
        difficulty: "Beginner",
        instructions: "Raise the dumbbells in front of your body to approximately shoulder height.",
    },
    {
        name: "Face Pull",
        description: "Targets the rear deltoids and upper back.",
        muscleGroup: "Shoulders",
        equipment: "Cable Machine",
        difficulty: "Intermediate",
        instructions: "Pull the rope toward your face while externally rotating your shoulders.",
    },

    // =========================
    // LEGS
    // =========================
    {
        name: "Bodyweight Squat",
        description: "A fundamental lower-body exercise.",
        muscleGroup: "Legs",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        instructions: "Lower your hips while keeping your chest up, then drive through your feet to stand.",
    },
    {
        name: "Leg Press",
        description: "A machine-based compound lower-body exercise.",
        muscleGroup: "Legs",
        equipment: "Leg Press Machine",
        difficulty: "Beginner",
        instructions: "Lower the platform under control and press it away without locking your knees.",
    },
    {
        name: "Barbell Squat",
        description: "A compound exercise targeting the quads, glutes and core.",
        muscleGroup: "Legs",
        equipment: "Barbell",
        difficulty: "Intermediate",
        instructions: "Squat with the bar securely positioned while maintaining a neutral spine.",
    },
    {
        name: "Romanian Deadlift",
        description: "A hip-hinge exercise targeting the hamstrings and glutes.",
        muscleGroup: "Legs",
        equipment: "Barbell",
        difficulty: "Intermediate",
        instructions: "Push your hips backward while keeping the bar close to your legs.",
    },
    {
        name: "Leg Extension",
        description: "An isolation exercise for the quadriceps.",
        muscleGroup: "Legs",
        equipment: "Leg Extension Machine",
        difficulty: "Beginner",
        instructions: "Extend your knees smoothly and squeeze your quadriceps at the top.",
    },
    {
        name: "Leg Curl",
        description: "An isolation exercise targeting the hamstrings.",
        muscleGroup: "Legs",
        equipment: "Leg Curl Machine",
        difficulty: "Beginner",
        instructions: "Curl your heels toward your body while keeping your hips stable.",
    },

    // =========================
    // ARMS
    // =========================
    {
        name: "Dumbbell Curl",
        description: "A basic biceps exercise.",
        muscleGroup: "Arms",
        equipment: "Dumbbells",
        difficulty: "Beginner",
        instructions: "Curl the dumbbells upward while keeping your elbows close to your body.",
    },
    {
        name: "Hammer Curl",
        description: "Targets the biceps and brachialis.",
        muscleGroup: "Arms",
        equipment: "Dumbbells",
        difficulty: "Beginner",
        instructions: "Curl the dumbbells while maintaining a neutral grip.",
    },
    {
        name: "Tricep Pushdown",
        description: "An isolation exercise for the triceps.",
        muscleGroup: "Arms",
        equipment: "Cable Machine",
        difficulty: "Beginner",
        instructions: "Push the cable attachment downward while keeping your elbows close to your sides.",
    },
    {
        name: "Overhead Tricep Extension",
        description: "Targets the triceps through an overhead movement.",
        muscleGroup: "Arms",
        equipment: "Dumbbell",
        difficulty: "Intermediate",
        instructions: "Lower the weight behind your head and extend your elbows to return.",
    },

    // =========================
    // CORE
    // =========================
    {
        name: "Plank",
        description: "An isometric exercise for the core.",
        muscleGroup: "Core",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        instructions: "Keep your body straight and brace your core while holding the position.",
    },
    {
        name: "Crunch",
        description: "A basic abdominal exercise.",
        muscleGroup: "Core",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        instructions: "Curl your upper body toward your knees while keeping the movement controlled.",
    },
    {
        name: "Leg Raise",
        description: "Targets the lower abdominal muscles.",
        muscleGroup: "Core",
        equipment: "Bodyweight",
        difficulty: "Intermediate",
        instructions: "Raise your legs under control and lower them without losing core tension.",
    },
    {
        name: "Russian Twist",
        description: "A rotational core exercise.",
        muscleGroup: "Core",
        equipment: "Bodyweight",
        difficulty: "Intermediate",
        instructions: "Rotate your torso from side to side while keeping your core engaged.",
    },
];


// =====================================================
// WORKOUT DEFINITIONS
// =====================================================

const workoutTemplates = [
    {
        name: "Full Body Beginner",
        description: "A simple full-body workout designed for members who are new to training.",
        muscleGroup: "Full Body",
        goal: "General Fitness",
        difficulty: "Beginner",
        duration: 35,
        exercises: [
            ["Bodyweight Squat", 3, 12, 60],
            ["Push Up", 3, 10, 60],
            ["Lat Pulldown", 3, 12, 60],
            ["Dumbbell Shoulder Press", 3, 10, 60],
            ["Plank", 3, 30, 45],
        ],
    },

    {
        name: "Chest Beginner",
        description: "A beginner-friendly chest workout.",
        muscleGroup: "Chest",
        goal: "Build Muscle",
        difficulty: "Beginner",
        duration: 35,
        exercises: [
            ["Push Up", 3, 12, 60],
            ["Bench Press", 3, 10, 90],
            ["Cable Fly", 3, 12, 60],
        ],
    },

    {
        name: "Chest Intermediate",
        description: "A balanced intermediate chest workout.",
        muscleGroup: "Chest",
        goal: "Build Muscle",
        difficulty: "Intermediate",
        duration: 50,
        exercises: [
            ["Bench Press", 4, 10, 90],
            ["Incline Dumbbell Press", 3, 12, 75],
            ["Cable Fly", 3, 12, 60],
            ["Push Up", 3, 15, 60],
        ],
    },

    {
        name: "Back Beginner",
        description: "A beginner-friendly workout focused on building back strength.",
        muscleGroup: "Back",
        goal: "Build Muscle",
        difficulty: "Beginner",
        duration: 35,
        exercises: [
            ["Lat Pulldown", 3, 12, 60],
            ["Seated Cable Row", 3, 12, 60],
        ],
    },

    {
        name: "Back Intermediate",
        description: "An intermediate back-strengthening workout.",
        muscleGroup: "Back",
        goal: "Build Muscle",
        difficulty: "Intermediate",
        duration: 50,
        exercises: [
            ["Lat Pulldown", 4, 10, 75],
            ["Seated Cable Row", 3, 12, 60],
            ["Barbell Row", 3, 10, 90],
            ["Pull Up", 3, 8, 90],
        ],
    },

    {
        name: "Shoulders Beginner",
        description: "A beginner shoulder workout.",
        muscleGroup: "Shoulders",
        goal: "Build Muscle",
        difficulty: "Beginner",
        duration: 30,
        exercises: [
            ["Dumbbell Shoulder Press", 3, 10, 60],
            ["Lateral Raise", 3, 12, 45],
            ["Front Raise", 3, 12, 45],
        ],
    },

    {
        name: "Shoulders Intermediate",
        description: "A complete intermediate shoulder workout.",
        muscleGroup: "Shoulders",
        goal: "Build Muscle",
        difficulty: "Intermediate",
        duration: 45,
        exercises: [
            ["Dumbbell Shoulder Press", 4, 10, 75],
            ["Lateral Raise", 3, 12, 45],
            ["Front Raise", 3, 12, 45],
            ["Face Pull", 3, 12, 60],
        ],
    },

    {
        name: "Legs Beginner",
        description: "A beginner-friendly lower-body workout.",
        muscleGroup: "Legs",
        goal: "Build Strength",
        difficulty: "Beginner",
        duration: 40,
        exercises: [
            ["Bodyweight Squat", 3, 15, 60],
            ["Leg Press", 3, 12, 75],
            ["Leg Extension", 3, 12, 60],
            ["Leg Curl", 3, 12, 60],
        ],
    },

    {
        name: "Legs Intermediate",
        description: "A complete intermediate leg workout.",
        muscleGroup: "Legs",
        goal: "Build Muscle",
        difficulty: "Intermediate",
        duration: 55,
        exercises: [
            ["Barbell Squat", 4, 10, 90],
            ["Leg Press", 3, 12, 75],
            ["Romanian Deadlift", 3, 10, 90],
            ["Leg Extension", 3, 12, 60],
            ["Leg Curl", 3, 12, 60],
        ],
    },

    {
        name: "Arms Beginner",
        description: "A simple beginner workout for biceps and triceps.",
        muscleGroup: "Arms",
        goal: "Build Muscle",
        difficulty: "Beginner",
        duration: 30,
        exercises: [
            ["Dumbbell Curl", 3, 12, 60],
            ["Hammer Curl", 3, 12, 60],
            ["Tricep Pushdown", 3, 12, 60],
        ],
    },

    {
        name: "Arms Intermediate",
        description: "An intermediate biceps and triceps workout.",
        muscleGroup: "Arms",
        goal: "Build Muscle",
        difficulty: "Intermediate",
        duration: 40,
        exercises: [
            ["Dumbbell Curl", 3, 10, 60],
            ["Hammer Curl", 3, 12, 60],
            ["Tricep Pushdown", 3, 12, 60],
            ["Overhead Tricep Extension", 3, 10, 60],
        ],
    },

    {
        name: "Core Beginner",
        description: "A beginner core workout focused on stability.",
        muscleGroup: "Core",
        goal: "Core Strength",
        difficulty: "Beginner",
        duration: 20,
        exercises: [
            ["Plank", 3, 30, 45],
            ["Crunch", 3, 15, 45],
        ],
    },

    {
        name: "Core Intermediate",
        description: "An intermediate core workout.",
        muscleGroup: "Core",
        goal: "Core Strength",
        difficulty: "Intermediate",
        duration: 30,
        exercises: [
            ["Plank", 3, 45, 45],
            ["Crunch", 3, 20, 45],
            ["Leg Raise", 3, 12, 60],
            ["Russian Twist", 3, 16, 60],
        ],
    },
];


// =====================================================
// SEED
// =====================================================

async function main() {
    console.log("🌱 Starting FITZONE workout seed...");

    // -------------------------------------------------
    // 1. Create exercises
    // -------------------------------------------------

    const exerciseMap = new Map();

    for (const exerciseData of exercises) {
        let exercise = await prisma.exercise.findFirst({
            where: {
                name: exerciseData.name,
            },
        });

        if (!exercise) {
            exercise = await prisma.exercise.create({
                data: exerciseData,
            });

            console.log(`✅ Exercise created: ${exercise.name}`);
        } else {
            console.log(`ℹ️ Exercise already exists: ${exercise.name}`);
        }

        exerciseMap.set(exercise.name, exercise);
    }

    // -------------------------------------------------
    // 2. Create workout templates
    // -------------------------------------------------

    for (const templateData of workoutTemplates) {
        let template = await prisma.workoutTemplate.findFirst({
            where: {
                name: templateData.name,
            },
        });

        if (!template) {
            template = await prisma.workoutTemplate.create({
                data: {
                    name: templateData.name,
                    description: templateData.description,
                    muscleGroup: templateData.muscleGroup,
                    goal: templateData.goal,
                    difficulty: templateData.difficulty,
                    duration: templateData.duration,
                    status: "ACTIVE",
                },
            });

            console.log(`🏋️ Workout created: ${template.name}`);
        } else {
            console.log(`ℹ️ Workout already exists: ${template.name}`);
        }

        // -------------------------------------------------
        // 3. Add exercises to workout
        // -------------------------------------------------

        for (
            let index = 0;
            index < templateData.exercises.length;
            index++
        ) {
            const [
                exerciseName,
                sets,
                reps,
                restSeconds,
            ] = templateData.exercises[index];

            const exercise = exerciseMap.get(exerciseName);

            if (!exercise) {
                throw new Error(
                    `Exercise not found: ${exerciseName}`
                );
            }

            const existingTemplateExercise =
                await prisma.workoutTemplateExercise.findFirst({
                    where: {
                        templateId: template.id,
                        exerciseId: exercise.id,
                    },
                });

            if (!existingTemplateExercise) {
                await prisma.workoutTemplateExercise.create({
                    data: {
                        templateId: template.id,
                        exerciseId: exercise.id,
                        sets,
                        reps,
                        restSeconds,
                        orderIndex: index + 1,
                    },
                });

                console.log(
                    `   ↳ Added ${exercise.name} to ${template.name}`
                );
            }
        }
    }

    console.log("");
    console.log("🎉 FITZONE workout library seeded successfully!");
}

main()
    .catch((error) => {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });