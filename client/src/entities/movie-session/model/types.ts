export interface MovieSession {
    id: number;
    movieId: number;
    cinemaId: number;
    startTime: string;
    seats: {
        rows: number;
        seatsPerRow: number;
    };
    bookedSeats: Array<{ rowNumber: number; seatNumber: number }>;
}