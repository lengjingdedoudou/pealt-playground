import { map, Observable } from 'rxjs';
import { httpSrv } from '../../services/http/http.service';
import { HttpItems } from '../http.config';
import { DeptTree, TreeNode } from '../../../shared/types/admin';

function formatDeptTreeToTreeNode(tree: DeptTree[] = []): TreeNode[] {
	return tree.map(item => {
		return {
			title: item.label,
			key: item.id,
			children: item.children?.length ? formatDeptTreeToTreeNode(item.children!) : []
		};
	});
}

export function treeSelect(): Observable<TreeNode[]> {
	return httpSrv.sendRequest(HttpItems.treeSelect).pipe(
		map(({ data }) => {
			return formatDeptTreeToTreeNode(data);
		})
	);
}
