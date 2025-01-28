import { differenceInMinutes, parse } from 'date-fns';

export function calculateTimeDifference(inicializedAt: string, finalizedAt: string): string {
    const start = parse(inicializedAt, "HH:mm:ss", new Date());
    const end = parse(finalizedAt, "HH:mm:ss", new Date());
    const diffInMinutes = differenceInMinutes(end, start);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}