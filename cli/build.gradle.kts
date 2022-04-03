plugins {
    kotlin("jvm") version "1.6.10"
    id("com.github.johnrengelman.shadow") version "7.1.2"
}

group = "one.tunkshif"
version = "0.0.1"

repositories {
    mavenCentral()
    maven(url = "https://github.com/psiegman/mvn-repo/raw/master/releases")
}

dependencies {
    implementation("log4j:log4j:1.2.17")
    implementation("com.beust:jcommander:1.82")
    implementation(kotlin("stdlib"))
    implementation(project(":lib"))
}

tasks.jar {
    manifest{
        attributes(mapOf("Main-Class" to "one.tunkshif.epuber.Main"))
    }
}