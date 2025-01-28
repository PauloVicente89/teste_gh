import { differenceInMinutes, parse, format, addMinutes, isValid } from 'date-fns';

export function calculateTimeDifference(inicializedAt: string, finalizedAt: string): string {
    const start = parse(inicializedAt, "HH:mm:ss", new Date());
    const end = parse(finalizedAt, "HH:mm:ss", new Date());
    const diffInMinutes = differenceInMinutes(end, start);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function calculateTimeSum(totalHours: string, addHours: string): string {
    const start = parse(totalHours, "HH:mm", new Date());
    const end = parse(addHours, "HH:mm", new Date());

    const totalMinutes = start.getHours() * 60 + start.getMinutes() + end.getHours() * 60 + end.getMinutes();
    const totalTime = addMinutes(new Date(0), totalMinutes);

    const hours = totalTime.getUTCHours();
    const minutes = totalTime.getUTCMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}