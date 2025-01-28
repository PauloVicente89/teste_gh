import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityService } from '../../services/activities.service';
import './styles/create-activity.css';
import { ICreateActivity } from '../../interfaces/activities.interface';

interface IProps {
  fetchActivities: () => void;
}

export default function CreateActivity({ fetchActivities }: IProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const { handleSubmit: handleSubmitCreate, register: registerCreate, reset: resetCreate } = useForm<ICreateActivity>();

  const createActivity = async (values: ICreateActivity) => {
    try {
      values.inicialized_at = `${values.inicialized_at}:00`;
      values.finalized_at = `${values.finalized_at}:00`;
      await ActivityService.create(values);
      resetCreate();
    } catch (error: any) {
      setError(error.response.data.message[0]);
    } finally {
      fetchActivities();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitCreate(createActivity)} className="createActivityForm">
        <h3>Criar Nova Atividade</h3>
        <div className="formGroup">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            {...registerCreate('name', { required: true })}
            placeholder="Nome da atividade"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="date">Data:</label>
          <input type="date" id="date" {...registerCreate('date', { required: true })} />
        </div>
        <div className="formGroup">
          <label htmlFor="inicialized_at">Início:</label>
          <input type="time" id="inicialized_at" {...registerCreate('inicialized_at', { required: true })} />
        </div>
        <div className="formGroup">
          <label htmlFor="finalized_at">Fim:</label>
          <input type="time" id="finalized_at" {...registerCreate('finalized_at', { required: true })} />
        </div>
        <button type="submit" className="submitButton">
          Criar Atividade
        </button>
      </form>
      {error ? <p className="error">{error}</p> : <></>}
    </>
  );
}
