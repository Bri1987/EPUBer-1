package one.tunkshif.epuber.config

import one.tunkshif.epuber.session.SessionHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.config.annotation.*

@Configuration
@EnableWebSocket
class WebSocketConfig: WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(sessionHandler(), "/ws/session").setAllowedOrigins("*")
    }

    @Bean
   fun sessionHandler(): WebSocketHandler = SessionHandler()
}