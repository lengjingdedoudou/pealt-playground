import { map, Observable } from 'rxjs';
import { httpSrv } from '../../services/http/http.service';
import { HttpItems } from '../http.config';
import { QueryUserParams } from '@/app/core/api/types/user';
import { UserListWithMeta } from '../../../shared/types/admin';

export function listUser(query: QueryUserParams): Observable<UserListWithMeta> {
	return httpSrv.sendRequest(HttpItems.listUser, query).pipe(
		map(({ data }) => {
			return data;
		})
	);
}
