const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

(async function githubLogin() {
  let driver = await new Builder().forBrowser("safari").build();

  const screenshotsDir = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  try {
    //Probamos que la pagina de inicio de sesion carga correctamente
    await driver.get("https://github.com/login");
    await saveScreenshot(driver, "login_cargado");

    await driver.wait(until.elementLocated(By.id("login_field")), 5000);
    await driver.wait(until.elementLocated(By.id("password")), 5000);

    // ================================================
    // Validando que las credenciales sean incorrectas
    await driver.findElement(By.id("login_field")).sendKeys("email@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("la_contrasenia");
    await driver.findElement(By.name("commit")).click();
    await driver.wait(until.urlContains("github.com"), 5000);
    await saveScreenshot(driver, "prueba_validacion_credenciales_login");

 // ================================================
    // Validando que las credenciales sean correctas
    await driver.findElement(By.id("login_field")).sendKeys("seleniumprueba33@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("Sln@@!s21");
    await driver.findElement(By.name("commit")).click();
    await driver.wait(until.urlContains("github.com"), 10000);
    await driver.sleep(5000); 
    const isSecurityPage = await validateSecurityPage(driver);
    if (isSecurityPage) {
      console.log("Validación exitosa: se redirigió a la página de código de seguridad.");
      await saveScreenshot(driver, "pagina_codigo_seguridad");
    } else {
      console.error("No se redirigió a la página de código de seguridad.");
    }
    console.log(
      "Credenciales correctas de el login."
    );

    // ============================================
    // Validando las cookies

    await driver.get("https://github.com/login");
    const manageCookiesLink = await driver.wait(
      until.elementLocated(By.linkText("Manage cookies")),
      5000
    );
    await manageCookiesLink.click();

    await driver.wait(until.elementLocated(By.css("div[role='dialog']")), 5000);
    const acceptButtons = await driver.findElements(By.xpath("//input[@value='accept']"));
    for (const button of acceptButtons) {
      await button.click();
    }
    await saveScreenshot(driver, "Cookies_aceptadas");
    const saveChangesButton = await driver.findElement(By.xpath("//button[contains(text(), 'Save changes')]"));
    await saveChangesButton.click();

    console.log("Cookies aceptadas y cambios guardados exitosamente.");
  } catch (error) {
    console.error("Error durante el login:", error);

    await saveScreenshot(driver, "error_occurred");
  } finally {
    await driver.quit();
  }

  async function saveScreenshot(driver, filename) {
    const screenshot = await driver.takeScreenshot();
    const filePath = path.join(screenshotsDir, `${filename}.png`);
    fs.writeFileSync(filePath, screenshot, "base64");
    console.log(`Captura guardada en: ${filePath}`);
  }
  async function validateSecurityPage(driver) {
    try {
      // Esperar hasta 10 segundos para que un elemento específico de la página cargue
      await driver.wait(until.elementLocated(By.id("otp")), 3000); // ID del campo de código de seguridad
      return true; // Página de seguridad detectada
    } catch (error) {
      return false; // Página de seguridad no detectada
    }
  }
})();
