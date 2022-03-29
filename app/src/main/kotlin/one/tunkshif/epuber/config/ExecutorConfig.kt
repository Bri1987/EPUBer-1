package one.tunkshif.epuber.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

@Configuration
class ExecutorConfig {
    @Bean
    fun executorService(): ExecutorService = Executors.newFixedThreadPool(8)
    // TODO: configurable thread size
}