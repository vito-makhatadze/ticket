<?php
/**
 *  app/Http/Controllers/Api/v1/UserController.php
 *
 * Date-Time: 17.03.21
 * Time: 11:58
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\v1;

use App\Exceptions\ValidationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\UserRequest;
use App\Http\Resources\Api\v1\RoleResource;
use App\Http\Resources\Api\v1\UserCollection;
use App\Http\Resources\Api\v1\UserResource;
use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use http\Exception;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;

        $this->authorizeResource(User::class);
    }

    /**
     * Get the list of resource methods which do not have model parameters.
     *
     * @return array
     */
    protected function resourceMethodsWithoutModels(): array
    {
        return ['index', 'store', 'update', 'destroy', 'show', 'restore'];
    }

    /**
     * Display a listing of the resource.
     *
     * @param UserRequest $request
     *
     * @return UserCollection
     */
    public function index(UserRequest $request): UserCollection
    {
        return $this->userRepository->getData($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     *
     * @return UserResource
     */
    public function store(UserRequest $request): UserResource
    {
        return $this->userRepository->createNewItem($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return UserResource
     * @throws ValidationException
     */
    public function show(int $id): UserResource
    {
        $data = $this->userRepository->findOrFail($id);
        return new UserResource($data);
    }

}
