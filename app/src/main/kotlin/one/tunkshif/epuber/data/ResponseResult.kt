package one.tunkshif.epuber.data

sealed class ResponseResult<T> {
    data class Success<T>(val data: T) : ResponseResult<T>()
    data class Error(val message: String) : ResponseResult<Unit>()

    companion object {
        fun <T> ok(data: T) = Success(data)
        fun err(message: String) = Error(message)
    }
}