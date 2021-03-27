<?php
/**
 *  app/Repositories/UserRepositoryInterface.php
 *
 * Date-Time: 17.03.21
 * Time: 11:58
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Repositories;



use App\Http\Requests\Api\v1\UserRequest;
use App\Http\Resources\Api\v1\UserCollection;
use App\Http\Resources\Api\v1\UserResource;

interface UserRepositoryInterface
{
    /**
     * @param UserRequest $request
     */
    public function getData(UserRequest $request);

    /**
     * Create new model
     *
     * @param UserRequest $request
     *
     * @return UserResource
     */
    public function createNewItem(UserRequest $request): UserResource;

    /**
     * Update user item
     *
     * @param int $id
     * @param UserRequest $request
     *
     * @return mixed
     */
    public function updateItem(int $id, UserRequest $request): UserResource;
}
