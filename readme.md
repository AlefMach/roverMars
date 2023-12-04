### Disable ipv6 temporarily

If your attempt to run docker compose build fails due to timeout problems, try disabling IPv6 temporarily on your computer. If you are using Ubuntu Linux, you can try running this command:

```bash
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
```

after run command:

```bash
sudo sysctl -p
```
After rebooting, IPv6 will return normally.