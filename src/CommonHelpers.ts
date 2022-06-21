import RatingData from "./Rating";

export function getAverageRating(ratings: RatingData[]): number {
    var totalRatings = 0;

    ratings.forEach(rating => {
        totalRatings += rating.rating
    });

    return Number((totalRatings / ratings.length).toFixed(1))
}

export function getRatingSummary(ratings: RatingData[]): number[] {
    var totalCount: number[] = [0, 0, 0, 0, 0];

    ratings.forEach(rating => {
        switch (rating.rating) {
            case 1:
                totalCount[0] += 1;
                break;
            case 2:
                totalCount[1] += 1;
                break;
            case 3:
                totalCount[2] += 1;
                break;
            case 4:
                totalCount[3] += 1;
                break;
            case 5:
                totalCount[4] += 1;
                break;
        }
    });

    return totalCount;
}

export function getDisplayTimeFromUnixTimestamp(timeStamp: number) : string {
    return new Date(timeStamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "IST",
    })
}