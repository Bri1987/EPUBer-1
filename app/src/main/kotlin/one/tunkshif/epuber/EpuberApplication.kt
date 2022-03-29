package one.tunkshif.epuber

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping

@SpringBootApplication
class EpuberApplication

fun main(args: Array<String>) {
	runApplication<EpuberApplication>(*args)
}
