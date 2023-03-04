package com.mateo9x.hrsystem.config;

import java.nio.file.Paths;
import java.util.List;

import com.fasterxml.jackson.databind.SerializationFeature;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@EnableWebMvc
@Configuration
@EnableScheduling
public class AdditionalApplicationConfiguration implements WebMvcConfigurer {

//    @Bean
//    public WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> containerCustomizer() {
//        return container -> container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/urlNotFound"));
//    }

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry){
//        registry.addResourceHandler("/**").addResourceLocations(Paths.get("web-ui").toAbsolutePath() + "\\dist");
//    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:index.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*").maxAge(3600)
                .allowCredentials(true).allowedOrigins("http://localhost:4200");
    }

//    @Override
//    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
//        for (HttpMessageConverter<?> converter : converters) {
//            if (converter instanceof AbstractJackson2HttpMessageConverter jacksonconverter) {
//                jacksonconverter.getObjectMapper().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//            }
//        }
//    }

}
