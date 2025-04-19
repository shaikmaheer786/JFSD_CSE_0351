import java.util.*;

public class StudentAnalyzer {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Double> marks = new ArrayList<>();

        System.out.println("Enter student marks (type 'done' to finish):");

        while (true) {
            System.out.print("Mark: ");
            String input = scanner.nextLine();

            if (input.equalsIgnoreCase("done")) break;

            try {
                double mark = Double.parseDouble(input);

                
                if (mark < 0 || mark > 100) {
                    System.out.println("Please enter a mark between 0 and 100.");
                    continue;
                }

                marks.add(mark);
            } catch (NumberFormatException e) {
                System.out.println("Invalid input, try again.");
            }
        }

        scanner.close();

        if (marks.isEmpty()) {
            System.out.println("No marks entered.");
            return;
        }

        double sum = 0;
        for (double m : marks) sum += m;

        double average = sum / marks.size();
        String grade = calculateGrade(average);
        double stdDev = calculateStdDev(marks, average);

        System.out.println("\n--- Analysis Result ---");
        System.out.printf("Average: %.2f\n", average);
        System.out.printf("Grade: %s\n", grade);
        System.out.printf("Standard Deviation: %.2f\n", stdDev);
    }

    public static String calculateGrade(double avg) {
        if (avg >= 90) return "A";
        else if (avg >= 75) return "B";
        else if (avg >= 60) return "C";
        else return "D";
    }

    public static double calculateStdDev(List<Double> marks, double mean) {
        double sumSquaredDiffs = 0;
        for (double m : marks) {
            sumSquaredDiffs += Math.pow(m - mean, 2);
        }
        
        return Math.sqrt(sumSquaredDiffs / marks.size());
    }
}