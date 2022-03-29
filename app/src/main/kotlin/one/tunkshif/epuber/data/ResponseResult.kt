package one.tunkshif.epuber.data

sealed class ResponseResult<T> {
    data class Success<T>(val data: T) : ResponseResult<T>()
    data class Error(val errors: List<String>) : ResponseResult<Unit>()

    companion object {
        fun <T> ok(data: T) = Success(data)
        fun err(vararg errors: String) = Error(errors.toList())
    }
}