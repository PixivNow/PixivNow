import type { NumberLike } from '~/types'

export async function addUserFollow(user_id: NumberLike): Promise<any> {
  return (
    await $fetch<{ data: any }>('/bookmark_add.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: {
        mode: 'add',
        type: 'user',
        user_id: '' + user_id,
        tag: '',
        restrict: '0',
        format: 'json',
      },
    })
  ).data
}

export async function removeUserFollow(user_id: NumberLike): Promise<any> {
  return (
    await $fetch<{ data: any }>('/rpc_group_setting.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: {
        mode: 'del',
        type: 'bookuser',
        id: '' + user_id,
      },
    })
  ).data
}
