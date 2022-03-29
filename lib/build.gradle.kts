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
    implementation("nl.siegmann.epublib:epublib-core:3.1")
    implementation("org.apache.pdfbox:pdfbox:2.0.25")

    implementation(kotlin("stdlib"))
}