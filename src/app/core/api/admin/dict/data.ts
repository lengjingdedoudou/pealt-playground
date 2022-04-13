import { map, Observable } from 'rxjs';
import { httpSrv } from '../../../services/http/http.service';
import { HttpItems } from '../../http.config';
import { DictType } from '../../types/user';
import { StatusOptions } from '@/app/shared/types/admin';

export function getDicts(dictType: DictType): Observable<StatusOptions[]> {
	return httpSrv.sendRequest(HttpItems.getDicts, { dictType }).pipe(
		map(({ data }) => {
			return data;
		})
	);
}
