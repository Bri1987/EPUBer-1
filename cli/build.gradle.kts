plugins {
    kotlin("jvm") version "1.6.10"
}

group = "one.tunkshif"
version = "0.0.1"

repositories {
    mavenCentral()
    maven(url = "https://github.com/psiegman/mvn-repo/raw/master/releases")
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation(project(":lib"))
}