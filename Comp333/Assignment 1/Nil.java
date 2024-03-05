public class Nil implements ImmutableList {
    public Nil() {}

    public boolean equals(final Object other) {
        return other instanceof Nil;
    } // equals

    public int length() {
        return 0; // length of empty list is 0
    } // length

    public int sum() {
        return 0; // sum of empty list is 0
    } // sum

    public ImmutableList append(final ImmutableList other) {
        return other; // empty list so other is returned
    } // append

    public boolean contains(final int value) {
        return false; // empty list does not contain any values
    } // contains
    
    public String toString() {
        return "Nil";
    } // toString

    public int hashCode() {
        return 0;
    } // hashCode
} // Nil
    