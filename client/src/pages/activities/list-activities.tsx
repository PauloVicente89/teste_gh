import { useCallback, useEffect, useState } from 'react';
import { IActivity } from '../../interfaces/activities.interface';
import { ActivityService } from '../../services/activities.service';
import { calculateTimeDifference } from '../../utils/calculate-hours';

interface Filters {
  name?: string;
  description?: string;
  active?: string;
}

export default function ListActivities(): JSX.Element {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [filters, setFilters] = useState<Filters>({} as Filters);
	const [error, setError] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [activities, setActivities] = useState<IActivity[]>([])

	const formatDate = (dateString: Date): string => {
		const date = new Date(dateString);
		const day = String(date.getUTCDate()).padStart(2, '0');
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getUTCFullYear();

		return `${day}/${month}/${year}`;
	}

	const fetchActivities = useCallback(async() => {
		setLoading(true)
		try {
			const { data } = await ActivityService.findAll({
        ...filters,
        page: currentPage,
      });
			setActivities(data)
		} catch (error: any) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}, [currentPage, filters])

	useEffect(() => {
		fetchActivities()
	}, [fetchActivities])

  return (
    <div id="listActivities">
			{activities ? (
				<ul className="list">
					{activities.map((activity, index) => (
						<li key={index} className="listItem">
							<p>Nome: {activity.name}</p>
							<p>Data: {formatDate(activity.date)}</p>
							<p>Tempo: {calculateTimeDifference(activity.inicialized_at, activity.finalized_at)}</p>
						</li>
					))}
				</ul>
			) : (
				<></>
			)}
    </div>
  )
}
