import { map, Observable } from 'rxjs';
import { RouteItemOption } from '@/app/shared/types/route';
import { httpSrv } from '../../services/http/http.service';
import { HttpItems } from '../http.config';

export function getRoutes(): Observable<RouteItemOption[]> {
	return httpSrv.sendRequest(HttpItems.getRoutes).pipe(
		map(({ data }) => {
			return data;
		})
	);
}
