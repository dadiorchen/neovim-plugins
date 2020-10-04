var winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
const cp = require('child_process');
const attach = require('neovim').attach;


describe("Test", () => {

  it("test", async () => {

    const nvim_proc = cp.spawn('nvim', ['-u', 'NONE', '-N', '--embed'], {});

    // Attach to neovim process
    await (async function() {
      const nvim = await attach({ proc: nvim_proc });
      nvim.command('vsp');
      //nvim.command('vspxxxx');
      //const result = await nvim.feedKeys(":vsp", "m", true);
      expect(nvim.request).toBeInstanceOf(Function);
      expect(nvim.prefix).toBeDefined();
      let result = await nvim.request(`${nvim.prefix}feedkeys`, [":vsp", "m", true]);
      expect(result).toBe(null);

      
      nvim.command('vsp');
      const windows = await nvim.windows;

      expect(windows.length).toEqual(4);
      // expect(windows[0] instanceof nvim.Window).toEqual(true);
      // expect(windows[1] instanceof nvim.Window).toEqual(true);

      nvim.window = windows[2];
      const win = await nvim.window;

      // expect(win).not.toEqual(windows[0]);
      // expect(win).toEqual(windows[2]);

      const buf = await nvim.buffer;
      // expect(buf instanceof nvim.Buffer).toEqual(true);

      const lines = await buf.lines;
      // expect(lines).toEqual(['']);

      await buf.replace(['line1', 'line2'], 0);
      const newLines = await buf.lines;
      expect(newLines).toEqual(['line1', 'line2']);

      nvim.quit();
//      nvim_proc.disconnect();
    })();
  });
});
